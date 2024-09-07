import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // URL do backend
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentUser: Observable<any> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Registra um novo usuário
  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token); // Armazena o token no localStorage
          this.currentUserSubject.next(response.user); // Atualiza o usuário atual
        }
      })
    );
  }

  // Faz login do usuário
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token); // Armazena o token no localStorage
          this.currentUserSubject.next(response.user); // Atualiza o usuário atual
        }
      })
    );
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Retorna true se o token estiver presente
  }

  // Faz logout do usuário
  logout(): void {
    localStorage.removeItem('token'); // Remove o token do localStorage
    this.currentUserSubject.next(null); // Limpa o usuário atual
  }

  // Método para obter usuários
  getUsers(): Observable<any[]> {
    const token = localStorage.getItem('token'); // Obter o token de autenticação armazenado

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Cabeçalho de autenticação
    });

    return this.http.get<any[]>(`${this.apiUrl}/users`, { headers });
  }
}
