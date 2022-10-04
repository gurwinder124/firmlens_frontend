export default function(){
    const user = localStorage.getItem('user_access_token');
    if (user) {
        console.log('auth login');
      }
      else{
        console.log('not auth login');
        window.location.href = '/login'
      }
}