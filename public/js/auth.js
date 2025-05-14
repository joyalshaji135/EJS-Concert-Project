// Helper function to show alerts
function showAlert(message, type = 'error') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `fixed top-4 right-4 px-4 py-2 rounded-md shadow-md ${
      type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
    }`;
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
      alertDiv.remove();
    }, 3000);
  }
  
  // Helper function to toggle loading state
  function setLoading(form, isLoading) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (isLoading) {
      submitButton.disabled = true;
      submitButton.innerHTML = `
        <span class="inline-block animate-spin mr-2">↻</span> Processing...
      `;
    } else {
      submitButton.disabled = false;
      submitButton.textContent = submitButton.textContent.includes('Register') ? 'Register' : 'Login';
    }
  }
  
  // Register form submission
  document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    setLoading(form, true);
    
    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value.trim()
    };
  
    try {
      const response = await axios.post('/register', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        showAlert('Registration successful! Redirecting...', 'success');
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        showAlert(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      showAlert(
        error.response?.data?.message || 
        error.response?.data?.errors?.[0]?.msg || 
        'Registration failed. Please try again.'
      );
    } finally {
      setLoading(form, false);
    }
  });
  
  // Login form submission
  document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    setLoading(form, true);
    
    const formData = {
      email: form.email.value.trim(),
      password: form.password.value.trim()
    };
  
    try {
      const response = await axios.post('/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        showAlert('Login successful! Redirecting...', 'success');
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        showAlert(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      showAlert(
        error.response?.data?.message || 
        error.response?.data?.errors?.[0]?.msg || 
        'Login failed. Please check your credentials and try again.'
      );
    } finally {
      setLoading(form, false);
    }
  });