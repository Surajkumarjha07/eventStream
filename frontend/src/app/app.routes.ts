import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { HomeComponent } from '../components/home/home.component';
import { EventInfoComponent } from '../components/event-info/event-info.component';
import { CreateEventPageComponent } from '../components/create-event-page/create-event-page.component';
import { EventFormComponent } from '../components/event-form/event-form.component';
import { TicketsComponent } from '../components/tickets/tickets.component';
import { FindEventsComponent } from '../components/find-events/find-events.component';
import { PaymentPageComponent } from '../components/payment-page/payment-page.component';
import { SpecificEventComponent } from '../components/specific-event/specific-event.component';
import { ManageEventsComponent } from '../components/manage-events/manage-events.component';
import { AccountSettingsComponent } from '../components/account-settings/account-settings.component';
import { LikesComponent } from '../components/likes/likes.component';
import { SearchedEventsComponent } from '../components/searched-events/searched-events.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'signUp', component: SignUpComponent},
    {path: 'eventInfo', component: EventInfoComponent},
    {path: 'createEvents', component: CreateEventPageComponent},
    {path: 'eventForm', component: EventFormComponent},
    {path: 'tickets', component: TicketsComponent},
    {path: 'findEvents', component: FindEventsComponent},
    {path: 'payment', component: PaymentPageComponent},
    {path: 'specificEvent', component: SpecificEventComponent},
    {path: 'manageEvents', component: ManageEventsComponent},
    {path: 'accountSettings', component: AccountSettingsComponent},
    {path: 'likes', component: LikesComponent},
    {path: 'searchedEvents', component: SearchedEventsComponent},
    {path: '', component: HomeComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
