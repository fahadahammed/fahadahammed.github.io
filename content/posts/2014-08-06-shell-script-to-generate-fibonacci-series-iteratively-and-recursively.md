---
title: Shell Script to Generate Fibonacci Series Iteratively and Recursively
author: Fahad Ahammed
type: post
date: 2014-08-06T05:52:15+00:00
url: /shell-script-to-generate-fibonacci-series-iteratively-and-recursively/
categories:
  - Study
  - Technology
tags:
  - application of fibonacci series
  - fibonacci series in shell
  - scripts
  - shell script to generate fibonacci series or number
  - usefulness of fibonacci series or numbers
  - What are the application or use of Fibonacci numbers or series?
  - where does fibonacci series used ?

---
By definition, the first two Fibonacci numbers are 0 and 1, and each subsequent number is the sum of the previous two. I will show you two shell script to generate Fibonacci series recursively and iteratively. Also you will get idea about the application of Fibonacci series/numbers.<!--more-->

In mathematical terms, the sequence Fn of Fibonacci numbers is defined by the recurrence relation Fn = Fn-1 + Fn-2, with seed values F0 = 0 and F1 = 1.

<p style="text-align: center;">
  <a href="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Shell_Script_to_Generate_Fibonacci_Series_Iteratively_and_Recursively.png"><img loading="lazy" class="alignnone size-medium wp-image-2058" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Shell_Script_to_Generate_Fibonacci_Series_Iteratively_and_Recursively-300x300.png?resize=300%2C300" alt="Shell_Script_to_Generate_Fibonacci_Series_Iteratively_and_Recursively" width="300" height="300" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Shell_Script_to_Generate_Fibonacci_Series_Iteratively_and_Recursively.png?resize=300%2C300&ssl=1 300w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Shell_Script_to_Generate_Fibonacci_Series_Iteratively_and_Recursively.png?resize=150%2C150&ssl=1 150w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Shell_Script_to_Generate_Fibonacci_Series_Iteratively_and_Recursively.png?w=610&ssl=1 610w" sizes="(max-width: 300px) 100vw, 300px" data-recalc-dims="1" /></a>
</p>

<p style="text-align: center;">
  <h3>
    What are the application or use of Fibonacci numbers or series?
  </h3>
  
  <p>
    The original inspiration for the Fibonacci numbers came from 2 rabbits. If you have 2 rabbits, they will breed and you will then have 3 rabbits. 3 rabbits breeds to make 5, 5 to make 8 and so on. The Fibonacci sequence.
  </p>
  
  <p>
    This ratio is the basis many sculptors, artists, and architects over the years have used to create golden rectangles that are pleasing to the eye. It has also been used in designing many man-made structures and materials. Usage of the Fibonacci numbering sequence in design include the Parthenon, the United Nations building, music by Partok, and art by Van Gogh, Monet, Vermeer, Leonardo da Vinci and others.This sequence is not only found in man-made elements but also all around us in nature. This is a basis on which many Christian scientists determine to prove that there was a great and marvelous God who created our Earth and universe. It is not by mere coincidence that the Fibonacci sequence has an ubiquitous presence throughout creation.
  </p>
  
  <h3>
    Iterative Method in Shell Script:
  </h3>
  
  <pre>#!/bin/bash
# SCRIPT:  interactive_fibonacci.sh
# USAGE:   interactive_fibonacci.sh [Number]
# PURPOSE: Generate Fibonacci sequence.
#
echo "---------------------------------------------------------------"
echo "Collected By: Fahad Ahammed"
echo "Website: www.obakfahad.com"
echo "Email: me@obakfahad.com"
echo "---------------------------------------------------------------"
#
#####################################################################
#                     Script Starts Here                            #
#####################################################################

if [ $# -eq 1 ]
then
Num=$1
else
echo -n "Enter a Number :"
read Num
fi

f1=0
f2=1

echo "The Fibonacci sequence for the number $Num is : "
echo ""

for (( i=0;i&lt;=Num;i++ ))
do
echo -n "$f1 "
fn=$((f1+f2))
f1=$f2
f2=$fn
done

echo
echo ""
echo "Thank You"
echo ""</pre>
  
  <h4>
    Output:
  </h4>
  
  <pre>bash iterative_fibonacci.sh 14</pre>
  
  <pre>---------------------------------------------------------------
Collected By: Fahad Ahammed
Website: www.obakfahad.com
Email: me@obakfahad.com
---------------------------------------------------------------
The Fibonacci sequence for the number 14 is :

0 1 1 2 3 5 8 13 21 34 55 89 144 233 377

Thank You</pre>
  
  <h3>
    Recursive Method in Shell Script:
  </h3>
  
  <pre>#!/bin/bash
# SCRIPT:  recursive_fibonacci.sh
# USAGE:   recursive_fibonacci.sh [Number]
# PURPOSE: Generate Fibonacci sequence.
#
echo "---------------------------------------------------------------"
echo "Collected By: Fahad Ahammed"
echo "Website: www.obakfahad.com"
echo "Email: me@obakfahad.com"
echo "---------------------------------------------------------------"
#
#####################################################################
#                      Arguments Checking                           #
#####################################################################

if [ $# -eq 1 ]
then
Num=$1
else
echo -n "Enter a Number : "
read Num
fi

#####################################################################
#                      Define Functions Here                        #
#####################################################################

Fibonacci()
{

case $1 in
0|1) printf "$1 " ;;
*) echo -n "$(( $(Fibonacci $(($1-2)))+$(Fibonacci $(($1-1))) )) ";;
esac

#$(( )) construct is used instead of expr command for doing addition.
#$( ) constrict is used instead of back ticks.

}

#####################################################################
#                      Main Script Starts Here                      #
#####################################################################

echo "The Fibonacci sequence for the number $Num is : "
echo ""

for (( i=0; i&lt;=$Num; i++ ))
do
Fibonacci $i                     #Calling function Fibonacci
done

echo
echo ""
echo "Thank You"
echo ""</pre>
  
  <h4>
    Output:
  </h4>
  
  <pre>bash recursive_fibonacci.sh 14</pre>
  
  <pre>---------------------------------------------------------------
Collected By: Fahad Ahammed
Website: www.obakfahad.com
Email: me@obakfahad.com
---------------------------------------------------------------
The Fibonacci sequence for the number 14 is : 

0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 

Thank You</pre>
  
  <p>
    <strong>Difference:</strong> Outputs are same but difference in appearing. You will find iterative results very quickly but recursive one will make delay and appear the numbers slowly.
  </p>
  
  <p>
    If you use time command you will get clear idea.
  </p>
  
  <p>
    <strong>Iterative with Time:</strong>
  </p>
  
  <pre><strong>time</strong> bash iterative_fibonacci.sh 14</pre>
  
  <pre>---------------------------------------------------------------
Collected By: Fahad Ahammed
Website: www.obakfahad.com
Email: me@obakfahad.com
---------------------------------------------------------------
The Fibonacci sequence for the number 14 is :

0 1 1 2 3 5 8 13 21 34 55 89 144 233 377

Thank You


<strong>real    0m0.006s
user    0m0.000s
sys    0m0.004s</strong></pre>
  
  <p>
    <strong>Recursive with Time:</strong>
  </p>
  
  <pre><strong>time</strong> bash recursive_fibonacci.sh 14</pre>
  
  <pre>---------------------------------------------------------------
Collected By: Fahad Ahammed
Website: www.obakfahad.com
Email: me@obakfahad.com
---------------------------------------------------------------
The Fibonacci sequence for the number 14 is :

0 1 1 2 3 5 8 13 21 34 55 89 144 233 377

Thank You


<strong>real    0m3.085s
user    0m0.000s
sys    0m0.016s</strong></pre>
  
  <h3>
  </h3>
  
  <h3>
    How to use the Codes or Script?
  </h3>
  
  <p>
    You can just use terminal.
  </p>
  
  <p>
    Create a bash file (.sh) :
  </p>
  
  <pre>touch iterative_fibonacci.sh</pre>
  
  <p>
    Then make that file executable.
  </p>
  
  <pre>chmod a+x iterative_fibonacci.sh</pre>
  
  <p>
    Then edit by nano.
  </p>
  
  <pre>nano iterative_fibonacci.sh</pre>
  
  <p>
    Paste the code and save or use any editor to save. And then you can execute.
  </p>
  
  <h3>
    How to Execute?
  </h3>
  
  <p>
    You can use bash,
  </p>
  
  <pre>bash iterative_fibonacci.sh 15</pre>
  
  <p>
    or just script,
  </p>
  
  <pre>./iterative_fibonacci.sh 15</pre>
  
  <p>
    If you have any question you can just ask here in comment section. Thank you.
  </p>