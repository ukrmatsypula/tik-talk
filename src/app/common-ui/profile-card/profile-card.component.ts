import { Component, Input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interfaces';
import { ImageUrlPipe } from '../../helpers/pipes/image-url.pipe';

@Component({
  selector: 'app-profile-card',
  imports: [ImageUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  standalone: true,
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
}
