import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Reader } from '../../../../core/models/reader.model';
import { ReaderService } from '../../../../core/services/reader.service';
import { ErrorState } from "../../../shared/components/error-state/error-state";
import { LoadingSpinner } from "../../../shared/components/loading-spinner/loading-spinner";
import { NoResults } from "../../../shared/components/no-results/no-results";
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-readers-list',
  imports: [CommonModule, FormsModule, ErrorState, LoadingSpinner, NoResults],
  templateUrl: './readers-list.html',
  styleUrl: './readers-list.scss'
})
export class ReadersList implements OnInit {
  readers: Reader[] = [];
  filteredReaders: Reader[] = [];
  searchTerm: string = '';
  isLoading = true;
  error: string | null = null;

  constructor(
    private readerService: ReaderService,
    private router: Router,
    private authService: AuthService
  ) {}

  get isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

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
        this.filteredReaders = [...this.readers];
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'حدث خطأ في تحميل قائمة القراء';
        this.isLoading = false;
        console.error('Error loading readers:', error);
      }
    });
  }

  goToReaderProfile(uniqueUrl: string): void {
    this.router.navigate(['/', uniqueUrl]);
  }

  goToAddReader(): void {
    this.router.navigate(['/form']);
  }

  goToEditReader(reader: Reader, event: Event): void {
    event.stopPropagation(); // Prevent card click event
    this.router.navigateByUrl('/form?reader=' + reader.uniqueUrl);
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredReaders = [...this.readers];
      return;
    }

    const searchLower = this.searchTerm.toLowerCase().trim();
    this.filteredReaders = this.readers.filter(reader => 
      reader.name.toLowerCase().includes(searchLower)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredReaders = [...this.readers];
  }
}
