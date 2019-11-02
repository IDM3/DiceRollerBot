function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low)
  }
  function roll(stringRoll, log) {
    if(!log)
    {
        log = function(string) {};
    }
    log(stringRoll);
    log("Raw Entry: " + stringRoll);
    stringRoll = stringRoll.replace(/\s/g, "");
    stringRoll = stringRoll.replace(/-\+/g, "-");
    stringRoll = stringRoll.replace(/\+-/g, "-");
    stringRoll = stringRoll.replace(/-/g, "+-");
    log("Transformed Entry: " + stringRoll);
    var total = 0;
    var results = [];
    var details = "";
    function recordDetail(addString)
    {
        if(!details)
        {
            details = "" + addString;
        }
        else
        {
            details = details + " + " + addString;
        }
    }
    var additives = stringRoll.split('+');
    for(i in additives)
    {
        var additive = additives[i];
        log("ad: " + additive)
        if(typeof(additive) == 'string')
        {
            if(additive.indexOf('d') == -1)
            {
                var number = Number.parseInt(additive);
                if(!Number.isNaN(number))
                {
                    total += number;
                    recordDetail(number);
                    log("Add Number:" + number);
                }
                else
                {
                    return "Additive "  + additive + " not a number";
                }
            }
            else
            {
                var parts = additive.split('d');
                log("Parts: " + parts.join(',"'));
                if(parts.length == 1)
                {
                    return "No dice type provided";            
                }
                if(parts.length == 2)
                {
                    var part = parts[1];
                    if(part == '%')
                    {
                        part = "100";
                    }
                    if(part == 'f' || part =='F')
                    {
                        part = "-1";
                    }
                    var sides = Number.parseInt(part);
                    log("sidesRaw;" + part);
                    log("sides:" + sides);
                    if (Number.isNaN(sides))
                    {
                        return "Die Type "  + part + " not a number";
                    }
                    else if (sides <= 0 && (sides != -1))
                    {
                        return "Die Type "  + part + " is less than 1";
                    }
                    part = parts[0];
                    if(!part)
                    {
                        part = "1";
                    }
                    var highest = false;
                    var lowest = false;
                    log("numberRaw;" + part);
                    if(part.indexOf('h') == 0 || part.indexOf('a') == 0 || part.indexOf('H') == 0 || part.indexOf('A') == 0)
                    {
                        highest = true;
                    }
                    else if(part.indexOf('l') == 0 || part.indexOf('L') == 0 || part.indexOf('D') == 0)
                    {
                        lowest = true;
                    }
                    if(highest || lowest)
                    {
                        if(part.length == 1)
                        {
                            part = part + "2";
                        }
                        part = part.substring(1);
                        
                    }
                    var isNegative = false;
                    var numberOfDice = Number.parseInt(part);
                    log("dice:" + numberOfDice);
                    if (Number.isNaN(numberOfDice))
                    {
                        return "Number of Dice "  + part + " not a number";
                    }
                    else if(numberOfDice < 0)
                    {
                        isNegative = true;
                        numberOfDice *= -1;
                    }

                    var high = 0;
                    var low = sides + 1;
                    var result = 0;
                    var componentRolls = [];
                    if((highest || lowest) && rollNumber == 1)
                    {
                        rollNumber = 2;
                    }
                    for(var rollNumber = 0; rollNumber < numberOfDice; rollNumber++)
                    {
                        var number;
                        if(sides == -1)
                        {
                            number = randomIntInc(-1, 1);
                        }
                        else
                        {
                            number = randomIntInc(1, sides);
                        }
                        componentRolls.push(number);
                        log("Roll: " + number);
                        if(!highest && !lowest)
                        {
                            if(isNegative)
                            {
                                total -= number;
                                recordDetail("-" + number);
                            }
                            else
                            {
                                total += number;
                                recordDetail(number);
                            }
                            continue;
                        }
                        if(low > number)
                        {
                            low = number;
                        }
                        if(high < number)
                        {
                            high = number;
                        }
                        
                    }
                    if(highest)
                    {
                        var display;
                        if(isNegative)
                        {
                            total -= high;
                            display = "-a[" + componentRolls.join(",") + "]" + high;
                        }
                        else
                        {
                            total += high;
                            display = "a[" + componentRolls.join(",") + "]" + high;
                        }
                        recordDetail(display);
                    }
                    else if (lowest)
                    {
                        var display;
                        if (isNegative)
                        {
                            total -= low;
                            display = "-D[" + componentRolls.join(",") + "]" + low;
                        }
                        else
                        {
                            total += low;
                            display = "D[" + componentRolls.join(",") + "]" + low;
                        }
                        recordDetail(display);
                    }
                }
                else
                {
                    return "To many varialbes in dice parameter " + additive + ".";
                }
            }
        }
        else
        {
            recordDetails("Added " + additive);
            total += additive;
        }
    }
    
    return  details + "\r\n" +total;
  }


module.exports =  {
    roll: roll    
}