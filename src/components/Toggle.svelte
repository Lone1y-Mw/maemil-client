<div class="toggle">
  <input type="checkbox" id="toggle-input" />
  <label for="toggle-input"></label>
</div>

<style>
  .toggle {
    --toggle-body-width: 40px;
    --toggle-body-height: 20px;
    --toggle-circle-diameter: 15px;
    --toggle-bodycircle-interval: calc((var(--toggle-body-height) - var(--toggle-circle-diameter))/2);
  }

  .toggle > input {
    position: absolute;
    left: -1000%;
  }

  .toggle > input:checked + label {
    background: #7292ED;
  }

  .toggle > input:checked + label:after {
    left: calc(100% - (var(--toggle-circle-diameter) + var(--toggle-bodycircle-interval)));
  }

  .toggle > label {
    position: relative;
    display: block;
    width: var(--toggle-body-width);
    height: var(--toggle-body-height);
    background: #d3d3d3;
    border-radius: var(--toggle-body-height);
    transition: background .1s ease;
    cursor: pointer;
  }

  .toggle > label:after {
    content: "";
    position: absolute;
    top: 50%;
    left: var(--toggle-bodycircle-interval);
    width: var(--toggle-circle-diameter);
    height: var(--toggle-circle-diameter);
    border-radius: 100%;
    background: #fff;
    transform: translateY(-50%);
    box-shadow: 1px 3px 4px rgba(0,0,0,.1);
    transition: all .1s ease;
  }
</style>