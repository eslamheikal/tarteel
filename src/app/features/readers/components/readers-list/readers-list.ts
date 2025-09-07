import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Reader } from '../../../../core/models/reader.model';
import { ReaderService } from '../../../../core/services/reader.service';

@Component({
  selector: 'app-readers-list',
  imports: [CommonModule],
  templateUrl: './readers-list.html',
  styleUrl: './readers-list.scss'
})
export class ReadersList implements OnInit {
  readers: Reader[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private readerService: ReaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadReaders();
  }

  loadReaders(): void {
    this.isLoading = true;
    this.error = null;

    this.readerService.getAllReaders().subscribe({
      next: (readers) => {
        // Filter out readers with id 0 (غير متوفر)
        this.readers = readers.filter(reader => reader.id !== 0);
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'حدث خطأ في تحميل قائمة القراء';
        this.isLoading = false;
        console.error('Error loading readers:', error);
      }
    });
  }

  goToReaderProfile(readerId: number): void {
    this.router.navigate(['/profile', readerId]);
  }
}
