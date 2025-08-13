import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { HttpHeaders } from '@angular/common/http';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderDetails } from '../_model/order.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  public createTransaction(amount: number) {
    const token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get(
      `${environment.apiBaseUrl}/createTransaction/` + amount,
      {
        headers,
      }
    );
  }

  public markAsDelivered(orderId: number) {
    const token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get(
      `${environment.apiBaseUrl}/markOrderAsDelivered/` + orderId,
      {
        headers,
      }
    );
  }

  public getAllOrderDetailsForAdmin(
    status: string
  ): Observable<MyOrderDetails[]> {
    const token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<MyOrderDetails[]>(
      `${environment.apiBaseUrl}/getAllOrderDetails/` + status,
      {
        headers,
      }
    );
  }

  public getMyOrders(): Observable<MyOrderDetails[]> {
    const token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<MyOrderDetails[]>(
      `${environment.apiBaseUrl}/getOrderDetails`,
      {
        headers,
      }
    );
  }

  public deleteCartItem(cartId: number) {
    const token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.delete(
      `${environment.apiBaseUrl}/deleteCartItem/` + cartId,
      { headers }
    );
  }

  public addProduct(product: FormData) {
    const token = localStorage.getItem('jwtToken');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.httpClient.post<Product>(
      `${environment.apiBaseUrl}/addNewProduct`,
      product,
      { headers }
    );
  }

  public getAllProducts(pageNumber: number, searchKeyword: string = '') {
    return this.httpClient.get<Product[]>(
      `${environment.apiBaseUrl}/getAllProducts?pageNumber=` +
        pageNumber +
        '&searchKey=' +
        searchKeyword
    );
  }

  public getProductDetailsById(productId: any) {
    return this.httpClient.get<Product>(
      `${environment.apiBaseUrl}/getProductDetailsById/${productId}`
    );
  }

  public deleteProduct(productId: number) {
    const token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.delete(
      `${environment.apiBaseUrl}/deleteProductDetails/${productId}`,
      { headers }
    );
  }

  public getProductDetails(isSingleProductCheckout: boolean, productId: any) {
    const token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.get<Product[]>(
      `${environment.apiBaseUrl}/getProductDetails/${isSingleProductCheckout}/${productId}`,
      { headers }
    );
  }

  public placeOrder(orderDetails: OrderDetails, isCartCheckout: string) {
    const token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.post(
      `${environment.apiBaseUrl}/placeOrder/` + isCartCheckout,
      orderDetails,
      { headers }
    );
  }

  public addToCart(productId: number) {
    const token = localStorage.getItem('jwtToken'); // Or wherever you store it
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get(
      `${environment.apiBaseUrl}/addToCart/${productId}`,
      {
        headers,
      }
    );
  }

  public getCartDetails() {
    const token = localStorage.getItem('jwtToken'); // Or wherever you store it
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get(`${environment.apiBaseUrl}/getCartDetails`, {
      headers,
    });
  }
}
