<div class="toggle">
  <input type="checkbox" id="toggle-input" />
  <label for="toggle-input"></label>
</div>

<style>
  .toggle {
    --toggle-body-width: 400px;
    --toggle-body-height: 150px;
    --toggle-circle-diameter: 90px;
    --toggle-bodycircle-interval: calc((var(--toggle-body-height) - var(--toggle-circle-diameter))/2);
  }

  input {
    position: absolute;
    left: -1000%;
  }

  input:checked + label {
    background: #7292ED;
  }

  input:checked + label:after {
    left: calc(100% - (var(--toggle-circle-diameter) + var(--toggle-bodycircle-interval)));
  }

  label {
    position: relative;
    display: block;
    width: var(--toggle-body-width);
    height: var(--toggle-body-height);
    background: #d3d3d3;
    border-radius: var(--toggle-body-height);
    transition: background .4s;
    cursor: pointer;
  }

  label:after {
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
    transition: all .4s;
  }
</style>