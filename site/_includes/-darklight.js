const savedTheme = localStorage.getItem('theme');
if (savedTheme != null) {
  document.body.setAttribute("data-theme", savedTheme);
}
