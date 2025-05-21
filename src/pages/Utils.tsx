// utils/logout.ts
export const logout = () => {
    localStorage.removeItem('authToken');
    const userRole = localStorage.getItem('userRole');
    localStorage.removeItem('userRole');
  
    switch (userRole) {
      case 'faculty':
        window.location.href = '/login/faculty';
        break;
      case 'college':
        window.location.href = '/login/college';
        break;
      case 'counselor':
        window.location.href = '/login/counselor';
        break;
      default:
        window.location.href = '/login';
    }
  };
  