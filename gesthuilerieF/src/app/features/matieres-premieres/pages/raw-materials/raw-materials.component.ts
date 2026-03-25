import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbCardModule, NbInputModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { MatierePremiere } from '../../models/raw-material.models';
import { RawMaterialService } from '../../services/raw-material.service';

@Component({
  selector: 'app-raw-materials',
  templateUrl: './raw-materials.component.html',
  styleUrls: ['./raw-materials.component.scss'],
  standalone: true,
  imports: [
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class RawMaterialsComponent implements OnInit {
  rawMaterials: MatierePremiere[] = [];
  editingId: number | null = null;

  readonly rawMaterialForm;

  constructor(
    private formBuilder: FormBuilder,
    private rawMaterialService: RawMaterialService,
  ) {
    this.rawMaterialForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      type: ['', [Validators.required]],
      uniteMesure: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.rawMaterialService.getAll().subscribe(data => {
      this.rawMaterials = data;
    });
  }

  submit(): void {
    if (this.rawMaterialForm.invalid) {
      this.rawMaterialForm.markAllAsTouched();
      return;
    }

    const payload = this.rawMaterialForm.getRawValue();
    if (this.editingId !== null) {
      this.rawMaterialService.update(this.editingId, {
        nom: payload.nom ?? '',
        type: payload.type ?? '',
        uniteMesure: payload.uniteMesure ?? '',
        description: payload.description ?? '',
      }).subscribe(updated => {
        this.rawMaterials = this.rawMaterials.map(item =>
          item.idMatierePremiere === updated.idMatierePremiere ? updated : item,
        );
      });
    } else {
      this.rawMaterialService.create({
        nom: payload.nom ?? '',
        type: payload.type ?? '',
        uniteMesure: payload.uniteMesure ?? '',
        description: payload.description ?? '',
      }).subscribe(created => {
        this.rawMaterials = [...this.rawMaterials, created];
      });
    }

    this.resetForm();
  }

  edit(item: MatierePremiere): void {
    this.editingId = item.idMatierePremiere;
    this.rawMaterialForm.patchValue({
      nom: item.nom,
      type: item.type,
      uniteMesure: item.uniteMesure,
      description: item.description,
    });
  }

  remove(item: MatierePremiere): void {
    this.rawMaterialService.delete(item.idMatierePremiere).subscribe(() => {
      this.rawMaterials = this.rawMaterials.filter(current => current.idMatierePremiere !== item.idMatierePremiere);
      if (this.editingId === item.idMatierePremiere) {
        this.resetForm();
      }
    });
  }

  resetForm(): void {
    this.editingId = null;
    this.rawMaterialForm.reset({
      nom: '',
      type: '',
      uniteMesure: 'kg',
      description: '',
    });
  }

}

