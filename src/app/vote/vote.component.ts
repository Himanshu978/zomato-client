import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  @Input() id: any;
  @Input() type: string;


  constructor(private commentService: CommentService) { }

  ngOnInit() {

  }

  vote() {
    // type must be "review" or "restaurant"
    const data = {
      id: this.id,
      type: this.type
    };

      this.commentService.submitComment(data).subscribe((res) => {
        console.log(res);

     });

  }

}
