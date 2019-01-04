import { Component, OnInit, Input } from '@angular/core';
import { VotingService } from '../shared/voting.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  @Input() id: any;
  @Input() type: string;

  voted = false;
  voteStatus = 'Like';


  constructor(private votingService: VotingService) { }

  ngOnInit() {

  }

  vote() {
    // type must be "review" or "restaurant"
    const data = {
      id: this.id,
      type: this.type
    };

      this.votingService.vote(data).subscribe((res) => {
        if (res === 1) {
          this.voted = false;
          this.voteStatus = 'Like';

        } else {
          this.voted = true;
          this.voteStatus = 'Liked';
        }

     });

  }

}
