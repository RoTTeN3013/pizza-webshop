<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Pizza;
use Inertia\Inertia;

class CartController extends Controller
{
    //Pizza hozzáadása a kosárhoz
    public function addToCart(Request $request)
    {
        //Adatok kinyerése
        $quantity = (int) $request->input('quantity');
        $size = $request->input('size');
        $id = (int) $request->input('pizzaID');
        //Egyedi azonosító a tömbön, az ugyanolyan de más méretű pizzáknak, ez mindenképp egyedi lesz pl: pizzaID = 1, size = 24, id = 1+24 (25)
        $index = $id + (int)$size;
        $added = false; //Ellenőrzés céljából, hozzá lett - e már adva (view-ban fontos response-ban)

        //Kosár lekérdezése, kinyerése session-ből (vagy üres tömb létrehozása)
        $cart = session()->get('cart', []);

        if (isset($cart[$index])) {
            $added = true;
        } else {
            $cart[$index] = [
                'index' => $index, //array_values átrendezi az indexelést így nyomon tudom követni
                'pizza' => $id,
                'quantity' => $quantity,
                'size' => $size,
            ];
        }

        //Session változó update
        session()->put('cart', $cart);

        return response()->json([
            'status' => 200,
            'added' => $added
        ]);
    }

    public function addToCartConfirm(Request $request)
    {
        //Adatok kinyerése
        $quantity = (int) $request->input('quantity');
        $size = $request->input('size');
        $id = (int) $request->input('pizzaID');
        //Egyedi azonosító a tömbön, az ugyanolyan de más méretű pizzáknak, ez mindenképp egyedi lesz
        $index = $id + (int)$size;
        $msg = "";

         //Kosár lekérdezése, kinyerése session-ből (vagy üres tömb létrehozása)
        $cart = session()->get('cart', []);

        if (isset($cart[$index])) { //Amennyiben valóban létezik a tömb ezen eleme, a mennyiség növeljük
            $cart[$index]['quantity'] += $quantity;
        } else {
            //Ha bármilyen okból kifolyólag nem létezne mégsem, biztonság kedvéért
            $cart[$index] = [
                'index' => $index, //array_values átrendezi az indexelést így nyomon tudom követni
                'pizza' => $id,
                'quantity' => $quantity,
                'size' => $size,
            ];
        }

        //Session változó update (kosár)
        session()->put('cart', $cart);

        return response()->json([
            'status' => 200,
        ]);
    }

    public function showCart()
    {
        $total = 0;
        $cart_items = session()->get('cart', []);

        /* Tegyük fel, hogy a pizzák méretenkénti ára így változik,
        így könnyebben tudunk zámolni majd a végén, tároljuk a tömbben */

        $sizes = array(
            "24" => 0,
            "32" => 750,
            "64" => 1500,
        );

        if(!empty($cart_items)) {
            foreach($cart_items as &$item) { //Ref, hogy literáció közben tudjunk hozzáadni a tömb adott eleméhez
                $pizza = Pizza::where('id', $item['pizza'])->first();
                $item['name'] = $pizza->name;
                $item['price'] = $item['quantity'] * $pizza->price + $sizes[$item['size']];
                $total += $item['price'];
            }
        }

        return Inertia::render('Cart', [
            'cartItems'    => array_values($cart_items), //Ne object hanem array legyen
            'total'        => $total,
        ]);
    }

    public function updateCart(Request $request)
    {
        $quantity = (int)$request->input('quantity');
        $index = (int)$request->input('index');
        $total  = 0;
    
        $cart = session()->get('cart', []);

        if (isset($cart[$index])) {
            $cart[$index]['quantity'] = $quantity;
            if($quantity == 0) {
                unset($cart[$index]);
            }
        } 

        $sizes = array(
            "24" => 0,
            "32" => 750,
            "64" => 1500,
        );

        if(!empty($cart)) {
            foreach($cart as &$item) { //Ref, hogy literáció közben tudjunk hozzáadni a tömb adott eleméhez
                $pizza = Pizza::where('id', $item['pizza'])->first();
                $item['name'] = $pizza->name;
                $item['price'] = $item['quantity'] * $pizza->price + $sizes[$item['size']];
                $total += $item['price'];
            }
        }

        session()->put('cart', $cart);

        return response()->json([
            'status' => 200,
            'cartItems' => array_values($cart),
            'total' => $total,
        ]);
    }
}
