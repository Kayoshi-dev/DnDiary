<button class="dd-text-button">
  <slot />
</button>

<style>
  .dd-text-button {
    @apply relative inline-block px-6 py-3 font-bold text-white bg-gradient-to-r from-gray-700 via-gray-900 to-black rounded-lg shadow-md cursor-pointer transition-transform duration-100 ease-in-out;
  }
  .dd-text-button:before {
    content: "";
    @apply absolute inset-0 bg-opacity-25 rounded-lg;
    background: url("https://www.transparenttextures.com/patterns/dust.png");
  }
  .dd-text-button:hover {
    @apply from-gray-600 via-gray-800 to-black;
  }
  .dd-text-button:active {
    @apply transform scale-95;
  }
</style>
