<template>
    <div class="app">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link class="nav-link" :class="{ active: $route.path === '/level-editor' }" to="/level-editor">
                  Level Editor
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :class="{ active: $route.path === '/category' }" to="/category">
                  Category
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  
      <main class="container mt-4">
        <router-view></router-view>
      </main>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style>
  .app {
    min-height: 100vh;
  }
  </style>