class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :logged_in
  helper_method :token_str

  def logged_in
  	return session[:user_token].present?
  end

  def token_str
  	return session[:user_token]
  end

end
