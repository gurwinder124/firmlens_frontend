export default function(){
    const user = localStorage.getItem('access_token');
    if (user) {
        console.log('auth login');
      }
      else{
        console.log('not auth login');
        window.location.href = '/admin/login'
      }
}