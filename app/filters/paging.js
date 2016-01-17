app.filter('filter6', function () {
    return function (input , startFrom , size) {


        if (!input)  return;
        return input.slice(startFrom, startFrom+size);

    }
});