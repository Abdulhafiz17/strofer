<template>
  <div class="toggle-wrapper">
    <label class="toggle">
      <input
        type="checkbox"
        :checked="mode === 'dark' ? 'checked' : false"
        @change="$emit('toggle')"
      />
      <span class="toggler round">
        <!-- <span id="sun" class="fa fa-lg fa-sun"></span> -->
        <span id="sun">☀️</span>
        <!-- <span id="moon" class="fa fa-lg fa-moon"></span> -->
        <span id="moon">🌙</span>
      </span>
    </label>
  </div>
</template>

<script>
export default {
  props: ["mode"],
};
</script>

<style>
.toggle {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin: 10px;
}
.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggler {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #15202b;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.toggler:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background: #fff;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:focus + toggler {
  box-shadow: 0 0 2px #2196f3;
}

input:checked + .toggler:before {
  -webkit-transform: translateX(31px);
  -ms-transform: translateX(31px);
  transform: translateX(31px);
}

.toggler.round {
  border-radius: 34px;
  width: 65px;
}

.toggler.round:before {
  border-radius: 50%;
}

#sun {
  float: left;
  padding-top: -3px;
  padding-left: 4px;
  font-size: 1.3rem;
}

#moon {
  float: right;
  padding-top: -3px;
  padding-right: 3px;
  font-size: 1.3rem;
}
</style>

