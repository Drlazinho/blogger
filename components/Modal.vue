<template>
    <div class="modal-overlay" v-if="isVisible" @click.self="$emit('close')">
      <div class="modal-container">
        <header class="modal-header">
          <h3>{{ title }}</h3>
          <button class="modal-close" @click="$emit('close')">&times;</button>
        </header>
        <section class="modal-body">
          <slot></slot> </section>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: 'Modal Simples'
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos básicos para o modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 400px; /* Tamanho ajustado para simplicidade */
    position: relative;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  </style>