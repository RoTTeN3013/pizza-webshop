<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Pizza;

use App\Mail\OrderConfirmMail;
use Illuminate\Support\Facades\Mail;

use Inertia\Inertia;

class OrderController extends Controller
{
    public function index() {
        $total = 0;
        $cart_items = session()->get('cart', []);

        if(empty($cart_items)) {
            return Inertia::render('Welcome');
        }

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

        return Inertia::render('OrderConfirm', [
            'cartItems'    => array_values($cart_items), //Ne object hanem array legyen
            'total'        => $total,
        ]);
    }

    public function confirmOrder(Request $request) {

        $data = $request->validate(
            [
            'name' => 'required|string|min:3|max:125',
            'email' => 'required|email',
            'phone' => 'nullable|max:30',
            'address.city' => 'required',
            'address.street' => 'required',
            'address.number' => 'required',
            'address.zipcode' => 'required',
            'confirm' => 'accepted',
            'total' => 'nullable',
            'cartItems' => 'nullable',
            ],
            [
            'name.required' => 'Név megadása kötelező!',
            'name.min' => 'A név minimum 3 karakterből kell, hogy álljon!',
            'name.max' => 'A név maximum 125 karakterből állhat!',

            'email.required' => 'Email megadása kötelező!',
            'email.email' => 'Nem valid email címet adtál meg!',
                
            'phone.max' => 'Túl hosszú a megadott telefonszám!',

            'message.required' => 'Üzenet megadása kötelező!',
            'message.min' => 'Az üzenetnek minimum 5 karakterből kell, hogy álljon!',
            'message.max' => 'Az üzenet nem lehett hosszabb mint 255 karakter!',

            'address.city.required' => 'A város megadása kötelező!',
            'address.street.required' => 'Az utca megadása kötelező!',
            'address.number.required' => 'A házszám megadása kötelező!',
            'address.zipcode.required' => 'Irányítószám megadása kötelező!',

            'confirm.accepted' => 'Az üzenet elküldéséhez fogadd el az Általános Szerződési Feltételeket (ÁSZF)!',
            ]
        );

        Mail::to($request->input('email'))->send(new OrderConfirmMail($data));

        //A kosár törlése a rendelés után
        session(['cart' => []]);

        session(['order_confirmed' => true]);

        return response()->json(['message' => 'success'], 200);
    }

    public function showCOnfirmPage() {
        if(session()->get('order_confirmed') == true) {
            session()->forget('order_confirmed');
            return Inertia::render('ConfirmPage');
        }else {
            return Inertia::render('Welcome');
        }
    }
}
