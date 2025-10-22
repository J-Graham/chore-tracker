import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

const CHORES = [
  {
    id: 1,
    name: 'Hannah',
    chores: [
      { id: 1, name: 'Make bed', completed: false },
      { id: 2, name: 'Take out trash', completed: false },
      { id: 3, name: 'Do dishes', completed: false },
      { id: 4, name: 'Vacuum', completed: false },
      { id: 5, name: 'Mop', completed: false },
      { id: 6, name: 'Sweep', completed: false },
      { id: 7, name: 'Wipe down counters', completed: false },
    ]
  },
  {
    id: 2,
    name: 'Mackenzie',
    chores: [
      { id: 1, name: 'Make bed', completed: false },
      { id: 2, name: 'Take out trash', completed: false },
      { id: 3, name: 'Do dishes', completed: false },
      { id: 4, name: 'Vacuum', completed: false },
      { id: 5, name: 'Mop', completed: false },
      { id: 6, name: 'Sweep', completed: false },
      { id: 7, name: 'Wipe down counters', completed: false },
    ]
  }
]

interface Confetti {
  id: number;
  left: number;
  top: number;
  color: string;
  delay: number;
  xOffset: number;
  rotation: number;
  isSquare: boolean;
}

@Component({
  selector: 'app-chore-detail',
  imports: [CommonModule],
  templateUrl: './chore-detail.component.html',
  styleUrl: './chore-detail.component.css',
})
export class ChoreDetailComponent {
  protected readonly route = inject(ActivatedRoute);
  protected confetti = signal<Confetti[]>([]);
  protected celebrating = signal(false);
  private readonly personId = toSignal(
    this.route.paramMap.pipe(map(p => Number(p.get('id')))),
    { initialValue: Number(this.route.snapshot.paramMap.get('id')) || 0 }
  );
  protected readonly choresList = computed(() => {
    return CHORES.find(chore => chore.id === this.personId());
  });

  protected toggleChore(chore: any) {
    if (!chore.completed) {
      this.celebrate();
    }
    chore.completed = !chore.completed;
  }

  protected celebrate() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B500', '#FF1493'];
    const confettiCount = 40;
    const newConfetti: Confetti[] = [];

    for (let i = 0; i < confettiCount; i++) {
      newConfetti.push({
        id: Date.now() + i,
        left: 50,
        top: 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 300,
        xOffset: (Math.random() - 0.5) * 200,
        rotation: Math.random() * 720 - 360,
        isSquare: Math.random() > 0.5,
      });
    }

    this.confetti.set(newConfetti);
    this.celebrating.set(true);

    setTimeout(() => {
      this.confetti.set([]);
      this.celebrating.set(false);
    }, 4000);
  }
}
