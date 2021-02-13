import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GET_TOP_MENTIONS } from '../../graphql/queries/mentions';
import { mention, numberOfMentions } from '../../types';

@Component({
  selector: 'app-mentioned-stocks',
  templateUrl: './mentioned-stocks.component.html',
  styleUrls: ['./mentioned-stocks.component.scss'],
})
export class MentionedStocksComponent implements OnInit, OnDestroy {
  loading: boolean | null = null;
  mentions?: [mention];
  topMentions?: [numberOfMentions];
  limit: number = 10;
  private querySubscription?: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GET_TOP_MENTIONS,
        variables: {
          limit: this.limit,
        },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.topMentions = data.numberOfMentions.mentions;
        console.log('mentions', data.numberOfMentions.mentions);
      });
  }

  ngOnDestroy(): void {
    this.querySubscription?.unsubscribe();
  }
}
