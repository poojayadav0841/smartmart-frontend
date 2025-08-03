import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { HttpHeaders } from '@angular/common/http';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderDetails } from '../_model/order.model';
import { Observable } from 'rxjs';
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
      `http://localhost:9090/createTransaction/` + amount,
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
      `http://localhost:9090/markOrderAsDelivered/` + orderId,
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
      `http://localhost:9090/getAllOrderDetails/` + status,
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
      `http://localhost:9090/getOrderDetails`,
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
      `http://localhost:9090/deleteCartItem/` + cartId,
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
      'http://localhost:9090/addNewProduct',
      product,
      { headers }
    );
  }

  public getAllProducts(pageNumber: number, searchKeyword: string = '') {
    return this.httpClient.get<Product[]>(
      'http://localhost:9090/getAllProducts?pageNumber=' +
        pageNumber +
        '&searchKey=' +
        searchKeyword
    );
  }

  public getProductDetailsById(productId: any) {
    return this.httpClient.get<Product>(
      `http://localhost:9090/getProductDetailsById/${productId}`
    );
  }

  public deleteProduct(productId: number) {
    const token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.delete(
      `http://localhost:9090/deleteProductDetails/${productId}`,
      { headers }
    );
  }

  public getProductDetails(isSingleProductCheckout: boolean, productId: any) {
    const token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.get<Product[]>(
      `http://localhost:9090/getProductDetails/${isSingleProductCheckout}/${productId}`,
      { headers }
    );
  }

  public placeOrder(orderDetails: OrderDetails, isCartCheckout: string) {
    const token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.post(
      'http://localhost:9090/placeOrder/' + isCartCheckout,
      orderDetails,
      { headers }
    );
  }

  public addToCart(productId: number) {
    const token = localStorage.getItem('jwtToken'); // Or wherever you store it
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get(`http://localhost:9090/addToCart/${productId}`, {
      headers,
    });
  }

  public getCartDetails() {
    const token = localStorage.getItem('jwtToken'); // Or wherever you store it
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get(`http://localhost:9090/getCartDetails`, {
      headers,
    });
  }
}
