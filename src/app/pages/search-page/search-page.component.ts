import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';

import { Profile } from '../../data/interfaces/profile.interfaces';
import { ProfileService } from '../../data/services/profile.service';
import { ProfileFiltersComponent } from './profile-filters/profile-filters.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileFiltersComponent, ProfileCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  profileService = inject(ProfileService);
  profiles = this.profileService.filteredProfiles;

  constructor() {}
}
