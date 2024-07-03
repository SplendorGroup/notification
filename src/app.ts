import { Module } from '@nestjs/common';
import { Domain } from 'domain';
import { Application } from './application';
import { Infraestructure } from './infraestructure';
import { Presentation } from './presentation';

@Module({
  imports: [Infraestructure, Domain, Application, Presentation],
})
export class App {}
