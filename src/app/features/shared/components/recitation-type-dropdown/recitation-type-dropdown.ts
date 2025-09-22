import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioTypeEnum } from '../../../../core/enums/audio-type.enum';

export interface RecitationTypeOption {
  value: AudioTypeEnum | 'all';
  label: string;
}

@Component({
  selector: 'app-recitation-type-dropdown',
  imports: [CommonModule],
  templateUrl: './recitation-type-dropdown.html',
  styleUrl: './recitation-type-dropdown.scss'
})
export class RecitationTypeDropdown implements OnInit {
  @Input() selectedType: AudioTypeEnum | 'all' = 'all';
  @Input() showAllOption: boolean = true;
  @Input() disabled: boolean = false;
  @Output() selectionChange = new EventEmitter<AudioTypeEnum | 'all'>();

  recitationTypes: RecitationTypeOption[] = [
    { value: AudioTypeEnum.TELLAWA, label: 'تلاوة' },
    { value: AudioTypeEnum.KHATMA, label: 'ختمة' }
  ];

  allOption: RecitationTypeOption = { value: 'all', label: 'جميع الأنواع' };

  ngOnInit(): void {
    // Initialize with default selection if not provided
    if (!this.selectedType) {
      this.selectedType = 'all';
    }
  }

  onSelectionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value as AudioTypeEnum | 'all';
    this.selectedType = selectedValue;
    this.selectionChange.emit(selectedValue);
  }

  getDisplayValue(): string {
    if (this.selectedType === 'all') {
      return this.allOption.label;
    }
    
    const option = this.recitationTypes.find(type => type.value === this.selectedType);
    return option ? option.label : this.allOption.label;
  }
}
