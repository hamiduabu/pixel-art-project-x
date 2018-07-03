$(function() {
  /**
   * Block scoped variables used more than once
   */

  const gridArea = $('#pixel-canvas');
  const sizePicker = $('#size-picker');
  const height = $('#input-height');
  const width = $('#input-width');
  const bgColorPicker = $('#bg-color-picker');
  const fsBgColorPicker = $('#fs-bgcolor');
  const gridColor = $('#color-picker');
  const fsGridColor = $('#fs-gridcolor');

  /**
   * @description takes input/values from #input-height and #input-width to create grid
   */

  function makeGrid() {
    const gridHeight = height.val();
    const gridWidth = width.val();

    for (let n = 0; n < gridHeight; n++) {
      gridArea.append('<tr></tr>');
    }
    for (let m = 0; m < gridWidth; m++) {
      $('#pixel-canvas>tr').append('<td></td>');
    }
  }

  /**
   * @description Changes background color
   * @param {html attribute} elementId - html element ID
   */

  function changeBgColor(elementId) {
    const bgColor = elementId.val();
    $('body').css('background', bgColor);
    gridArea.css('background', '#fff');
  }

  /**
   * @description Changes grid color
   * @param {html attribute} elementId - html element ID
   * @returns {css property} Color
   */

  function changeGridColor(elementId) {
    const color = elementId.val();
    return color;
  }

  /**
   * @description When size is submitted by the user, clear previous Grid and call makeGrid()
   * @param {event} submit - On submit of height and width values
   * @param {handler} function - Call changeBgColor(elementId). Prevent default behaviour of submit event
   */

  sizePicker.submit(function(event) {
    gridArea.children().remove();
    makeGrid();
    event.preventDefault();
  });

  /**
   * @description Change mouse pointer to 'cell' type when over created grid
   * @param {event} mouseover - On mouse over created grid
   * @param {handler} function - Target grid area
   */

  gridArea.mouseover(function() {
    $(this).css('cursor', 'cell');
  });

  /**
   * @description Select/change background color value of application
   * @param {event} change - On Change of color value
   * @param {handler} function - Call changeBgColor(elementId)
   */

  bgColorPicker.on('change', function() {
    changeBgColor(bgColorPicker);
  });

  /**
   * @description Select/change background color value of application when fullscreen(fs) is selected
   * @param {event} change - On Change of color value
   * @param {handler} function - Call changeBgColor(elementId)
   */

  fsBgColorPicker.on('change', function() {
    changeBgColor(fsBgColorPicker);
  });

  /**
   * @description Select grid color value to apply or remove from grid
   * @param {event} click - On click of grid cells
   * @param {selector} td - Grid cell
   * @param {handler} function - Check for conditions and Call changeGridColor(elementId) either in normal or fullscreen(fs) view
   */

  gridArea.on('click', 'td', function() {
    fullScreen.html() === 'full screen'
      ? $(this).attr('style')
        ? $(this).removeAttr('style')
        : $(this).css('background', changeGridColor(gridColor))
      : $(this).attr('style')
        ? $(this).removeAttr('style')
        : $(this).css('background', changeGridColor(fsGridColor));
  });

  /**
   * @description Clear all color values from the grid
   * @param {event} click - On click of 'clear grid' button
   * @param {handler} function - Target grid cells to remove color values
   */

  const clearGrid = $('#clear');
  clearGrid.on('click', function() {
    $('#pixel-canvas td').removeAttr('style');
  });

  /**
   * @description Delete Grid and reset input values to 1
   * @param {event} click - On click of 'delete grid' button
   * @param {handler} function - Target table id to remove grid
   */

  const deleteGrid = $('#reset');
  deleteGrid.on('click', function() {
    gridArea.children().remove();
    height.val('1');
    width.val('1');
  });

  /**
   * @description Toggle 'full screen' to display grid area in a larger view
   * @param {event} click - On click of the 'fullscreen'(fs) button
   * @param {handler} function - Hides/shows a portion of the page view
   */

  const fullScreen = $('#hide');
  const btnFullscreen = $('.btn-fs');
  fullScreen.on('click', function() {
    $('#top').toggle('100ms', 'linear', function() {
      fullScreen.html() === 'full screen'
        ? fullScreen.html('normal screen') &&
          btnFullscreen.css('display', 'unset')
        : fullScreen.html('full screen') &&
          btnFullscreen.css('display', 'none');
    });
  });
});
