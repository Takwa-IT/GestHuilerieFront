import { Component } from '@angular/core';

@Component({
  selector: 'app-production-dashboard',
  templateUrl: './production-dashboard.component.html',
  styleUrls: ['./production-dashboard.component.scss'],
})
export class ProductionDashboardComponent {
  productionCards = [
    { label: 'Matière reçue', value: '42 650 kg', extra: 'Aujourd\'hui' },
    { label: 'Stock utilisable', value: '11 240 kg', extra: 'Après tri' },
    { label: 'Rendement instantané', value: '19.6%', extra: 'Ligne A' },
    { label: 'Qualité lot OL-031', value: 'A-', extra: 'Acidité 0.62%' },
  ];

  operations = [
    { name: 'Extraction lot OL-031', status: 'En cours', line: 'Ligne A' },
    { name: 'Nettoyage machine C-02', status: 'Planifiée', line: 'Ligne B' },
    { name: 'Analyse chimique post-extraction', status: 'En attente', line: 'Laboratoire' },
    { name: 'Transfert vers cuve de stockage', status: 'Terminée', line: 'Zone stockage' },
  ];

  machineLoad = [
    { machine: 'Presse P-01', load: 84 },
    { machine: 'Décanteur D-02', load: 72 },
    { machine: 'Centrifugeuse C-02', load: 63 },
    { machine: 'Filtre F-03', load: 90 },
  ];

  qualityParams = [
    { label: 'Acidité libre', value: '0.62%', target: '< 0.8%' },
    { label: 'Indice de peroxyde', value: '8.7', target: '< 15' },
    { label: 'Humidité pâte', value: '9.1%', target: '8-10%' },
  ];

  aiReadiness = 92;

  hourlyExtractionOptions: any = {
    tooltip: { trigger: 'axis' },
    grid: { left: 36, right: 20, top: 28, bottom: 24 },
    xAxis: {
      type: 'category',
      data: ['06h', '08h', '10h', '12h', '14h', '16h', '18h'],
      axisLine: { lineStyle: { color: '#9aa4b2' } },
    },
    yAxis: {
      type: 'value',
      axisLabel: { formatter: '{value} t' },
      splitLine: { lineStyle: { color: '#e6eadf' } },
    },
    series: [
      {
        type: 'bar',
        data: [4.2, 5.6, 7.1, 6.4, 7.8, 6.9, 5.2],
        itemStyle: { color: '#7e9440', borderRadius: [4, 4, 0, 0] },
      },
    ],
  };

  processPerformanceOptions: any = {
    tooltip: { trigger: 'axis' },
    grid: { left: 34, right: 22, top: 24, bottom: 22 },
    xAxis: {
      type: 'category',
      data: ['Extraction', 'Filtration', 'Stockage'],
      axisLine: { lineStyle: { color: '#9aa4b2' } },
    },
    yAxis: {
      type: 'value',
      axisLabel: { formatter: '{value}%' },
      splitLine: { lineStyle: { color: '#e6eadf' } },
      max: 100,
    },
    series: [
      {
        type: 'bar',
        data: [88, 79, 91],
        itemStyle: {
          color: (params: any) => ['#7e9440', '#9eb468', '#5f6f34'][params.dataIndex],
          borderRadius: [5, 5, 0, 0],
        },
      },
    ],
  };

  getStatusClass(status: string): string {
    return status
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
  }
}
