import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class DataService {

  private url = "/api";
  private queryGetKey = '_get';
  private queryPostKey = '_post';
  private queryPutKey = '_put';
  private queryDelKey = '_del';

  constructor(private http: HttpClient) { }

  getUserDatas<T>(typeUserDatas: string) {
    let myParams = new HttpParams();
    myParams = myParams.append(this.queryGetKey, typeUserDatas);
    return this.http.get<T>(this.url, { params: myParams });
  }

  putUserDatas<T>(putItem: T, typeItem: string) {
    return this.http.put<T>(this.url+'/'+typeItem, putItem);
  }
  
  postUserDatas<T>(postItem: T, typeItem: string) {
    return this.http.post<T>(this.url+'/'+typeItem, postItem);
  }

  delUserDatas<T>(delItem: T, typeItem: string) {
    let myParams = new HttpParams();
    myParams = myParams.append(this.queryDelKey, typeItem);
    return this.http.delete<T>(this.url+'/delete/'+delItem, {params: myParams }); 
  }
  
  postMultipartDatas(postItem: FormData, typeItem: string) {
    let myParams = new HttpParams();
    myParams = myParams.append(this.queryPostKey, typeItem);
    return this.http.post(this.url+'/'+'multipart', postItem, {params: myParams });
  }

  putMultipartDatas(putItem: FormData, typeItem: string) {
    let myParams = new HttpParams();
    myParams = myParams.append(this.queryPutKey, typeItem);
    return this.http.put(this.url+'/'+'multipart', putItem,{params: myParams });
  }

}
