<template>
  <section class="calculator">
    <HomeButton />
    <div class="app-container">
      <input v-model="current" class="display" readonly />
      <div class="buttons">
        <button @click="clear" id="operator">C</button>
        <button @click="append('%')" id="operator">%</button>
        <button @click="append('/')" id="operator">/</button>
        <button @click="backspace" id="operator"><v-icon name="md-backspace-round" /></button>
        <button @click="append('1')">1</button>
        <button @click="append('2')">2</button>
        <button @click="append('3')">3</button>
        <button @click="append('*')" id="operator">*</button>
        <button @click="append('7')">7</button>
        <button @click="append('8')">8</button>
        <button @click="append('9')">9</button>
        <button @click="append('-')" id="operator">-</button>
        <button @click="append('4')">4</button>
        <button @click="append('5')">5</button>
        <button @click="append('6')">6</button>
        <button @click="append('+')" id="operator">+</button>
        <button @click="calculate" class="evaluate">=</button>
        <button @click="append('0')">0</button>
        <button @click="append('.')" id="operator">.</button>
      </div>
    </div>
  </section>
</template>

<script>
import HomeButton from "@component/HomeButton.vue";
export default {
  components: {
    HomeButton,
  },
  data() {
    return {
      current: "",
    };
  },
  methods: {
    append(char) {
      this.current += char;
    },
    clear() {
      this.current = "";
    },
    backspace() {
      this.current = this.current.slice(0, -1);
    },
    calculate() {
      try {
        this.current = this.evaluateExpression(this.current).toString();
      } catch (error) {
        this.current = "Error";
      }
    },
    evaluateExpression(expression) {
      expression = expression.replace(/(\d+)%/g, (match, p1) => `${p1}*0.01`);

      const tokens = expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);

      if (!tokens) {
        throw new Error("Invalid expression");
      }

      const performOperation = (a, b, operator) => {
        switch (operator) {
          case "+":
            return a + b;
          case "-":
            return a - b;
          case "*":
            return a * b;
          case "/":
            return a / b;
          default:
            throw new Error("Invalid operator");
        }
      };

      let i = 1;
      while (i < tokens.length) {
        if (tokens[i] === "*" || tokens[i] === "/") {
          const result = performOperation(
            parseFloat(tokens[i - 1]),
            parseFloat(tokens[i + 1]),
            tokens[i]
          );
          tokens.splice(i - 1, 3, result.toString());
        } else {
          i++;
        }
      }

      let result = parseFloat(tokens[0]);
      for (i = 1; i < tokens.length; i += 2) {
        result = performOperation(result, parseFloat(tokens[i + 1]), tokens[i]);
      }

      return result;
    },
  },
};
</script>

<style scoped lang="sass">
@import "@style/main.sass"
.calculator
  @include display(flex, center, center)
  @extend %noselect
  min-height: 100vh
  .app-container
    width: 300px
    background: $col-white
    padding: 0.8rem
    border-radius: 8px
    box-shadow: 0 0 10px rgba($col-black, 0.1)
    .display
      width: 100%
      font-size: $fs-xx-large
      font-weight: $fw-medium
      text-align: right
      padding: 1rem 0.5rem
      margin-block: 0.5rem
      color: $col-dark
      background: transparent
      border: none
      border-radius: 4px
      box-shadow: rgba(50, 50, 93, 0.25) 0px 10px 40px -12px inset, rgba(0, 0, 0, 0.3) 0px 8px 26px -18px inset
      &:focus-within
        outline: none
    .buttons
      @include display(grid, center, center, 0.3rem, $gridtemplate: true, $columns: repeat(4, 1fr))
      background: $col-white
      button
        width: 60px
        height: 60px
        font-size: $fs-large
        background: $col-white
        border-radius: 4px
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px
        &.evaluate
          width: 100%
          color: $col-white
          background: $col-secondary
          grid-column: span 2
      #operator
        color: $col-secondary !important
</style>
