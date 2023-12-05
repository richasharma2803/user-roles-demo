<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use App\Services\ResponseService;
use Carbon\Carbon;

class ExampleController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public $response;

    public function __construct(ResponseService $response = null)
    {
        $this->response = $response;
    }

    public function dashboardCardData()
    {
        $totalUsers = User::all()->count();
        $totalActiveUsers = User::where('is_active', 1)->get()->count();
        $totalRoles = Role::all()->count();
        $totalActiveRoles = Role::where('is_active', 1)->get()->count();

        $data = [
            'totalUsers' => $totalUsers,
            'totalActiveUsers' => $totalActiveUsers,
            'totalRoles' => $totalRoles,
            'totalActiveRoles' => $totalActiveRoles,
        ];
        return $this->response->getResponse(
            $data = $data,
            $code = 200,
            $status = true,
            $message = '',
        );
    }

    public function dashboardChartData()
    {
        // $date = Carbon::now()->subDays(7);
        // $users = User::where('created_at', '>=', $date)->get()->count();

        $endDate = Carbon::yesterday();
        $startDate = $endDate->copy()->subDays(6);

        // Create an array with all dates in the last 7 days
        $dateRange = [];
        $currentDate = $startDate->copy();
        while ($currentDate <= $endDate) {
            $dateRange[] = $currentDate->toDateString();
            $currentDate->addDay();
        }

        $dailyTotalUsersData = User::whereDate('created_at', '>=', $startDate)
            ->whereDate('created_at', '<=', $endDate)
            ->selectRaw('DATE(created_at) as date, COUNT(*) as user_count')
            ->groupBy('date')
            ->get();

        // Initialize the result array with 0 counts for all dates
        $dailyTotalUsers = [];
        foreach ($dateRange as $date) {
            $day = Carbon::parse($date);
            $dayName = $day->format('D');

            $record = $dailyTotalUsersData->where('date', $date)->first();

            $dailyTotalUsers[$dayName] = [
                'day' => $dayName,
                'date' => $day->toDateString(),
                'count' => $record ? $record->user_count : 0,
            ];
        }
        // dd($dailyTotalUsers);

        $days = [];
        $count = [];
        $date = [];

        foreach ($dailyTotalUsers as $userData) {
            array_push($days, $userData['day']);
            array_push($count, $userData['count']);
            array_push($date, $userData['date']);
        }

        return $this->response->getResponse(
            $data = ['days' => $days, 'count' => $count, 'date' => $date],
            $code = 200,
            $status = true,
            $message = '',
        );
    }
}
