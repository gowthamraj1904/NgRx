import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './state/post.model';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    constructor(private httpClient: HttpClient) {}

    getPosts(): Observable<Post[]> {
        return this.httpClient.get<Post[]>('http://localhost:3000/posts');
    }
}
