import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { HomeComponent } from '../components/home/home.component';
import { EventInfoComponent } from '../components/event-info/event-info.component';
import { CreateEventPageComponent } from '../components/create-event-page/create-event-page.component';
import { AccountInfoComponent } from '../components/account-info/account-info.component';
import { EventFormComponent } from '../components/event-form/event-form.component';
import { TicketsComponent } from '../components/tickets/tickets.component';
import { FindEventsComponent } from '../components/find-events/find-events.component';
import { PaymentPageComponent } from '../components/payment-page/payment-page.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'signUp', component: SignUpComponent},
    {path: 'eventInfo', component: EventInfoComponent},
    {path: 'createEvents', component: CreateEventPageComponent},
    {path: 'accountInfo', component: AccountInfoComponent},
    {path: 'eventForm', component: EventFormComponent},
    {path: 'tickets', component: TicketsComponent},
    {path: 'findEvents', component: FindEventsComponent},
    {path: 'payment', component: PaymentPageComponent},
    {path: '', component: HomeComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
