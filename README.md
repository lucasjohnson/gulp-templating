# Gulp Templating

### Breakpoints

- sm: 576px;
- md: 768px;
- lg: 992px;
- xl: 1200px;

### Media Queries Mixin Usage

```css
.element {
  @include screen(sm) {
      width: 20%;
  }
  @include screen(md) {
    width: 40%;
  }
  @include screen(lg) {
    width: 60%;
  }
  @include screen(xl) {
    width: 80%;
  }
}
```

### Centering Mixin Usage

```css
.element {
  @include center(both);
}
.foo-parent {
  position: relative;
}
```

### Font Mixin

```css
p {
  @include font(14px, 100, 1px, 1.5, null)
}
```

### Animation Mixin

```css
// Define animation name, and properties
@include keyframes(fade-out) {
  0% { opacity: 1; }
  90% { opacity: 0; }
}

// Add animation to element
.element {
  width: 100px;
  height: 100px;
  background: black;
  @include animation('fade-out 5s 3');
}
```

### Retina Image Mixin

[Easy retina-ready images using SCSS](https://signalvnoise.com/posts/3271-easy-retina-ready-images-using-scss/ "Easy retina-ready images using SCSS")

```css
div.logo {
  background: url("logo.png") no-repeat;
  @include image-2x("logo2x.png", 100px, 25px);
}
```
