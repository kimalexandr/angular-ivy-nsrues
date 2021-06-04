import { Component, OnInit, Input } from '@angular/core';
import  {CommentI} from '../../../../shared/models/interfaces';


@Component({
  selector: 'quote-comment',
  templateUrl: './quote-comment.component.html',
  styleUrls: ['./quote-comment.component.scss']
})
export class QuoteCommentComponent implements OnInit {

  @Input() model:CommentI;

  constructor() { 
  }

  ngOnInit(): void {
    
  }

}
