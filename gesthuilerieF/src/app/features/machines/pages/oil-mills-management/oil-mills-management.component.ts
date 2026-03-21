import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbCardModule, NbInputModule, NbButtonModule, NbIconModule, NbSelectModule } from '@nebular/theme';
import { Huilerie, Machine } from '../../models/enterprise.models';
import { HuilerieService } from '../../services/huilerie.service';
import { MachineService } from '../../services/machine.service';

@Component({
    selector: 'app-oil-mills-management',
    templateUrl: './oil-mills-management.component.html',
    styleUrls: ['./oil-mills-management.component.scss'],
    standalone: true,
    imports: [
        NbCardModule,
        NbInputModule,
        NbButtonModule,
        NbIconModule,
        NbSelectModule,
        CommonModule,
        ReactiveFormsModule,
    ],
})
export class OilMillsManagementComponent implements OnInit {
  huileries: Huilerie[] = [];
  machines: Machine[] = [];

  editingHuilerieId: number | null = null;
  editingMachineId: number | null = null;

  readonly huilerieForm;
  readonly machineForm;

  constructor(
    private formBuilder: FormBuilder,
    private huilerieService: HuilerieService,
    private machineService: MachineService,
  ) {
    this.huilerieForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      localisation: ['', [Validators.required]],
      type: ['', [Validators.required]],
      certification: ['', [Validators.required]],
      capaciteProduction: [0, [Validators.required, Validators.min(1)]],
      entrepriseId: [1, [Validators.required]],
    });

    this.machineForm = this.formBuilder.group({
      nomMachine: ['', [Validators.required]],
      typeMachine: ['', [Validators.required]],
      etatMachine: ['EN_SERVICE', [Validators.required]],
      capacite: [0, [Validators.required, Validators.min(1)]],
      huilerieId: [1, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.huilerieService.getMock().subscribe(data => {
      this.huileries = data;
    });

    this.machineService.getMock().subscribe(data => {
      this.machines = data;
    });
  }

  submitHuilerie(): void {
    if (this.huilerieForm.invalid) {
      this.huilerieForm.markAllAsTouched();
      return;
    }

    const payload = this.huilerieForm.getRawValue();
    if (this.editingHuilerieId !== null) {
      this.huileries = this.huileries.map(h =>
        h.idHuilerie === this.editingHuilerieId
          ? {
              ...h,
              nom: payload.nom ?? h.nom,
              localisation: payload.localisation ?? h.localisation,
              type: payload.type ?? h.type,
              certification: payload.certification ?? h.certification,
              entrepriseId: Number(payload.entrepriseId ?? h.entrepriseId),
              capaciteProduction: Number(payload.capaciteProduction),
            }
          : h,
      );
    } else {
      const newId = Math.max(...this.huileries.map(h => h.idHuilerie), 0) + 1;
      this.huileries = [
        ...this.huileries,
        {
          idHuilerie: newId,
          active: true,
          nom: payload.nom ?? '',
          localisation: payload.localisation ?? '',
          type: payload.type ?? '',
          certification: payload.certification ?? '',
          capaciteProduction: Number(payload.capaciteProduction),
          entrepriseId: Number(payload.entrepriseId),
        },
      ];
    }

    this.resetHuilerieForm();
  }

  editHuilerie(item: Huilerie): void {
    this.editingHuilerieId = item.idHuilerie;
    this.huilerieForm.patchValue({
      nom: item.nom,
      localisation: item.localisation,
      type: item.type,
      certification: item.certification,
      capaciteProduction: item.capaciteProduction,
      entrepriseId: item.entrepriseId,
    });
  }

  toggleHuilerieStatus(item: Huilerie): void {
    this.huileries = this.huileries.map(h =>
      h.idHuilerie === item.idHuilerie ? { ...h, active: !h.active } : h,
    );
  }

  resetHuilerieForm(): void {
    this.editingHuilerieId = null;
    this.huilerieForm.reset({
      nom: '',
      localisation: '',
      type: '',
      certification: '',
      capaciteProduction: 0,
      entrepriseId: 1,
    });
  }

  submitMachine(): void {
    if (this.machineForm.invalid) {
      this.machineForm.markAllAsTouched();
      return;
    }

    const payload = this.machineForm.getRawValue();
    if (this.editingMachineId !== null) {
      this.machines = this.machines.map(m =>
        m.idMachine === this.editingMachineId
          ? {
              ...m,
              nomMachine: payload.nomMachine ?? m.nomMachine,
              typeMachine: payload.typeMachine ?? m.typeMachine,
              etatMachine: payload.etatMachine ?? m.etatMachine,
              capacite: Number(payload.capacite),
              huilerieId: Number(payload.huilerieId),
            }
          : m,
      );
    } else {
      const newId = Math.max(...this.machines.map(m => m.idMachine), 0) + 1;
      this.machines = [
        ...this.machines,
        {
          idMachine: newId,
          nomMachine: payload.nomMachine ?? '',
          typeMachine: payload.typeMachine ?? '',
          etatMachine: payload.etatMachine ?? 'EN_SERVICE',
          capacite: Number(payload.capacite),
          huilerieId: Number(payload.huilerieId),
        },
      ];
    }

    this.resetMachineForm();
  }

  editMachine(item: Machine): void {
    this.editingMachineId = item.idMachine;
    this.machineForm.patchValue({
      nomMachine: item.nomMachine,
      typeMachine: item.typeMachine,
      etatMachine: item.etatMachine,
      capacite: item.capacite,
      huilerieId: item.huilerieId,
    });
  }

  deleteMachine(item: Machine): void {
    this.machines = this.machines.filter(m => m.idMachine !== item.idMachine);
    if (this.editingMachineId === item.idMachine) {
      this.resetMachineForm();
    }
  }

  resetMachineForm(): void {
    this.editingMachineId = null;
    this.machineForm.reset({
      nomMachine: '',
      typeMachine: '',
      etatMachine: 'EN_SERVICE',
      capacite: 0,
      huilerieId: 1,
    });
  }

  getHuilerieName(huilerieId: number): string {
    return this.huileries.find(h => h.idHuilerie === huilerieId)?.nom ?? '-';
  }

  getMachineStatusLabel(value: string): string {
    if (value === 'EN_SERVICE') {
      return 'En service';
    }
    if (value === 'SURVEILLANCE') {
      return 'Surveillance';
    }
    if (value === 'MAINTENANCE') {
      return 'Maintenance';
    }
    return value;
  }

}

