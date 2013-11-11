MovieApp::Application.routes.draw do
 root 'main#index'

 get 'redirect', :to => 'main#redirect'
 get 'login' , :to => 'main#login'
 get 'logout' , :to => "main#logout"
end
