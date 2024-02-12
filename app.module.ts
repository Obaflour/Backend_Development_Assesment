import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { YourEntity } from './your-entity.entity'; // Import your entity

@NgModule({
  imports: [
    BrowserModule,
    TypeOrmModule.forRoot({
      // Load connection options from ormconfig.json
      load: [require('../ormconfig.json')],
    }),
    TypeOrmModule.forFeature([YourEntity]), // Register your entity
  ],
  declarations: [], // Add your components, directives, and pipes here
  providers: [], // Add your services here
  bootstrap: [], // Add your root component here if needed
})
export class AppModule {}

