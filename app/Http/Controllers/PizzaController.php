<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Pizza;
use Inertia\Inertia;

class PizzaController extends Controller
{
    //Pizzák listájának lekérdezése
    public function index(Request $request) {
        //Kinyerjük az URL-ből a filter value-t
        $name_filter = $request->query('nameFilter');
        $price_from = $request->query('priceFrom');
        $price_to = $request->query('priceTo');
        $pop_filter = $request->query('popularityFilter');
        $price_filter = $request->query('byPriceFilter');
        $keyword_filter = $request->query('keyword');

            //Névre és/vagy kulcsszóra való szűrés
            $query = Pizza::query();

            if ($name_filter) {
                $query->where('name', 'like', '%' . $name_filter . '%');
            }

            if ($price_from != null) {
                $query->where('price', '>=', $price_from);
            }

            if ($price_to != null & $price_to != 0) {
                $query->where('price', '<=', $price_to);
            }

            if ($price_to != null & $price_to != 0) {
                $query->where('price', '<=', $price_to);
            }

            if ($pop_filter) {
                if($pop_filter == 1) {
                    $query->orderBy('popularity', 'DESC');
                }else {
                    $query->orderBy('popularity', 'ASC');
                }
            }

            if ($price_filter) {
                if($price_filter == 1) {
                    $query->orderBy('price', 'ASC');
                }else {
                    $query->orderBy('price', 'DESC');
                }
            }

            if ($keyword_filter) {
                //Mivel json-ben van tárolva így először encode szükséges az összehasonlításhoz
                $keywords = json_encode($keyword_filter);
                $query->where('keywords', 'like', '%' . $keywords . '%');
            }

        //5 darabonkénti lapozó
        $pizzas = $query->paginate(5);

        return Inertia::render('Pizzas', [
            'pizzas'            => $pizzas,
            'nameFilter'        => $name_filter,
            'priceFrom'         => $price_from,
            'priceTo'           => $price_to,
            'popularityFilter'  => $pop_filter,
            'keyword'           => $keyword_filter,
            'byPrice'           => $price_filter,
        ]);
    }
}
