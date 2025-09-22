import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { ReaderInfoForm } from '../reader-info-form/reader-info-form';
import { AudioRecordingsForm } from '../audio-recordings-form/audio-recordings-form';
import { ToastrService } from 'ngx-toastr';
import { UserRoleEnum } from '../../../../core/enums/user-role.enum';
import { LoaderService } from '../../../shared/services/loader.service';
import { CanComponentDeactivate } from '../../../../core/guards/deactivate.guard';

@Component({
  selector: 'app-reader-form',
  imports: [CommonModule, ReaderInfoForm, AudioRecordingsForm],
  templateUrl: './reader-form.html',
  styleUrl: './reader-form.scss'
})
export class ReaderForm implements OnInit, CanComponentDeactivate {

  private router = inject(Router);
  private userService = inject(UserService);
  private toastr = inject(ToastrService);
  private loaderService = inject(LoaderService);
  private route = inject(ActivatedRoute);


  // Data storage
  canLeave = true;
  readerData: User = {} as User;
  audioRecordingsData: any[] = [];


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const uniqueUrl = params['reader'];
      if (uniqueUrl) {
        this.loadReaderData(uniqueUrl);
      }
    });
    
  }

  loadReaderData(uniqueUrl: string): void {
    this.loaderService.showLoader();

    this.userService.getReader(uniqueUrl).subscribe((reader) => {
      if (reader.isSuccess && reader.value) {
        this.readerData = reader.value;
      }
      else {
        this.toastr.error(reader.errors ? reader.errors[0] : 'فشل تحميل بيانات القارئ', 'خطأ');
      }
      // this.readerData = reader;
    }, _ => { }, () => this.loaderService.hideLoader());

  }

  onReaderInfoSubmit(data: User): void {

    // Create a complete user object with all required fields
    this.readerData = {
      id: data.id, // Will be set by the database
      name: data.name || '',
      email: this.readerData.uniqueUrl + '@reader.com',
      password: this.readerData.password || '********',
      imageUrl: data.imageUrl || '',
      bio: data.bio || '',
      role: this.readerData.role || UserRoleEnum.Reader,
      joinedDate: this.readerData.joinedDate || new Date().toISOString(),
      isActive: data.isActive,
      uniqueUrl: data.uniqueUrl || '',
      facebook: data.facebook || '',
      youtube: data.youtube || ''
    };

    if (this.readerData.id > 0) {
      this.updateReader(this.readerData);
    } else {
      this.addReader(this.readerData);
    }

  }

  addReader(newReader: User): void {

    this.loaderService.showLoader();
    this.userService.addReader(newReader).subscribe((reader) => {
      
      if (reader.isSuccess && reader.value && reader.value.id > 0) {
        this.toastr.success('تم إضافة القارئ بنجاح', 'مرحباً');
        this.readerData.id = reader.value.id;
      } else {
        this.toastr.error(reader.errors ? reader.errors[0] : 'فشل إضافة القارئ', 'خطأ');
      }

    }, _ => { }, () => this.loaderService.hideLoader());
  }

  updateReader(updatedReader: User): void {
    this.loaderService.showLoader();
    this.userService.updateReader(updatedReader).subscribe((reader) => {
      
      if (reader.isSuccess && reader.value && reader.value.id > 0) {
        this.toastr.success('تم تحديث القارئ بنجاح', 'مرحباً');
        this.readerData.id = reader.value.id;
      } else {
        this.toastr.error(reader.errors ? reader.errors[0] : 'فشل تحديث القارئ', 'خطأ');
      }

    }, _ => { }, () => this.loaderService.hideLoader());
  }

  onReaderInfoCancel(): void {
    this.readerData = null!;
    this.router.navigate(['/']);
  }

  onAudioRecordingsSubmit(recordings: any[]): void {
    console.log('Audio Recordings Submitted:', recordings);
    this.audioRecordingsData = recordings;
    // يمكن إضافة منطق خاص بحفظ التسجيلات الصوتية هنا
    // أو إرسال البيانات للخادم
  }

  onAudioRecordingsCancel(): void {
    this.readerData = null!;
    this.router.navigate(['/']);
  }

  checkReaderInfoChanges(): void {
    this.canLeave = false;
  }

  canDeactivate(): boolean {
    return this.canLeave;
  }

}
