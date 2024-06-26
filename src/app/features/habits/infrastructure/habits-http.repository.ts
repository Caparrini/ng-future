import { Injectable } from '@angular/core'
import { HabitsRepository } from '../domain/habits.repository'
import { CreateHabit } from '../features/create-habit/domain/create-habit'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { Id } from '../../../core/models/id'
import { UpdateHabit } from '../features/update-habit/domain/update-habit'

import { Habit } from '../domain/habit'

@Injectable({
  providedIn: 'root',
})
export class HabitsHttpRepository implements HabitsRepository {
  constructor(private readonly httpClient: HttpClient) {}

  findOne(id: Id): Promise<Habit> {
    return firstValueFrom(this.httpClient.get<Habit>(`habits/${id}`))
  }

  delete(id: Id): Promise<void> {
    return firstValueFrom(this.httpClient.delete<void>(`habits/${id}`))
  }

  update(update: UpdateHabit): Promise<void> {
    return firstValueFrom(this.httpClient.put<void>(`habits/${update.id}`, update))
  }

  save(createHabit: CreateHabit): Promise<void> {
    return firstValueFrom(this.httpClient.post<void>('habits', createHabit))
  }

  async findAll(): Promise<Habit[]> {
    const habits = await firstValueFrom(this.httpClient.get<Habit[]>('habits'))
    return habits
  }
}
