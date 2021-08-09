$('[rel~="github"]').readGitHub({
  branch: 'main',
  renderer: function(file) {
    return window.markdownit().render(file)
  }
})
