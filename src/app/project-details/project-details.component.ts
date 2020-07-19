import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from './../project.service';
import { IProject } from '../models/interfaces/IProject';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { EStatus } from '../models/enums/EStatus';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  public project$: Observable<IProject>;
  public EStatus = EStatus;
  private subscriptions: Subscription[];
  private id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  public ngOnInit() {
    this.subscriptions = [];
    this.subscriptions.push(
      this.route.paramMap.subscribe((params) => {
        this.id = parseInt(params.get('id'), 10);
        this.project$ = this.projectService.getProject(this.id);
      })
    );
  }

  public ngOnDestroy() {
    this.subscriptions.map((x) => {
      if (x) {
        x.unsubscribe();
      }
    });
  }

  public deleteProject() {
    this.subscriptions.push(
      this.projectService
        .deleteProject(this.id)
        .subscribe((x) => this.router.navigate(['./projects']))
    );
  }
}
