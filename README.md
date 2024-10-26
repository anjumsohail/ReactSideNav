This is Simply Plug&Play type Dynamic Collapsible Side Navigation Bar Developed using React, Tailwind Css and bootstrap.
You Simply need to pass the URL of Restfull api or for testing purpose or Demo Use this "./public/menuItems.json" or Modify it.
as here
"<NavSideBar Datas={{ logoText, personImg, url }} />"
The JSon Format should stictly be followed but still application will not collapse or crash.
You can dynamically populate the Menus depending upon the login user, 
![image](https://github.com/user-attachments/assets/46ef5359-4dab-4c97-aa76-759597f28b6b)

A sample Laravel PHP code for Restful api is given below.

use App\Models\User;
use Illuminate\Http\Request;
class UserController extends Controller
{
    public function getUserProfile(Request $request, $userId)
    {
        // Fetch user with their menus
        $user = User::with(['menus.children'])->find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Format the response
        $profile = [
            'username' => $user->username,
            'id' => $user->id,
            'email' => $user->email,
        ];

        $menu = $this->formatMenus($user->menus);

        return response()->json([
            'profile' => $profile,
            'menu' => $menu,
        ]);
    }

    private function formatMenus($menus)
    {
        return $menus->map(function ($menu) {
            return [
                'id' => (string)$menu->id,
                'name' => $menu->name,
                'path' => $menu->path,
                'parentID' => (string)$menu->parentID,
                'level' => (string)$menu->level,
                'icon' => $menu->icon,
                'children' => $this->formatMenus($menu->children),
            ];
        });
    }
}

