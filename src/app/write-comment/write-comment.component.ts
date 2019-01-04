import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from '../shared/comment.service';

@Component({
  selector: 'app-write-comment',
  templateUrl: './write-comment.component.html',
  styleUrls: ['./write-comment.component.scss']
})
export class WriteCommentComponent implements OnInit {
  @Input() id: any;
  @Input() type: string;
  commentForm: FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder,
    private commentService: CommentService
    ) { }

  ngOnInit() {
    this.commentForm = this.fb.group( {
      content: [ '', Validators.required]
    });
  }

  submitComment() {
    // type must be "review" or "restaurant"
    const data = {
      id: this.id,
      type: this.type
    };

    if (this.commentForm.valid) {

      this.commentService.submitComment(this.commentForm.value, data).subscribe((res) => {
        console.log(res);
        this.errorMessage = '';
        this.commentForm.reset();
        this.commentForm.updateValueAndValidity();
     },
     (err) => {
       if (err.status === 403) {
        this.errorMessage = '';

       }

     }
     );

    }






  }

}
