<div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <h2>Köszönjük a rendelésed!</h2>
    <h3>A rendelésed részletei:</h3>

    <p>Cím: {{ $details['address']['city'] }}, {{ $details['address']['street'] }} {{ $details['address']['number'] }}, {{ $details['address']['zipcode'] }}</p>
    <p>Email: {{ $details['email'] }}</p>
    @if(strlen($details['phone'] > 0))
        <p>Telefon: {{ $details['phone'] }}</p>
    @endif
    <p>Termékek:</p>
    @foreach($details['cartItems'] as $item)
    <div class="d-flex gap-2 flex-column align-items-center" style="text-align: center;">
        <p>Termék: {{ $item['name']}} {{ $item['size'] }}"</p>
        <p>Mennyiség: {{ $item['quantity']}}</p>
    </div>
    @endforeach
    <p>Végösszeg: {{ $details['total'] }}Ft</p>
</div>
