<div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <h2>Új üzenet érkezett</h2>
    <p>Név: {{ $details['name'] }}</p>
    <p>Email: {{ $details['email'] }}</p>
    @if(strlen($details['phone'] > 0))
        <p>Telefon: {{ $details['phone'] }}</p>
    @endif
    <p>Üzenet: {{ $details['message'] }}</p>
</div>
