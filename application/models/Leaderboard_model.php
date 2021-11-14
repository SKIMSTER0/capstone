<?php

/**
 * controls database logic for leaderboard controller
 */
class leaderboard_model extends ci_model
{
    public function __construct()
    {
        $this->load->database();
    }

    /**
     * retrieve all leaderboard data
     * @return array of all data from leaderboard table
     */
    public function getLeaderboardData(){
        try {
            $query = $this->db->get('leaderboard');
            return $query->result_array();

        } catch (PDOexception $e) {
            log_message('error', $e->errorInfo);
        }
    }

    /**
     * @param int $userId id of user to filter output, -1 if all users to be output
     * @return array leaderboard data including username, pco count and score
     */
    public function getLeaderboardUser(int $userId){
        try {
            $this->db->select('users.username, leaderboard.pco_count, leaderboard.score')
                ->from('leaderboard')
                ->join('users', 'users.user_id = leaderboard.user_id');

            if ($userId >= 0){
                $this->db->where('leaderboard.user_id', $userId);
            }

            $query = $this->db->get();
            return $query->result_array();

        } catch (PDOexception $e) {
            log_message('error', $e->errorInfo);
        }
    }

    /**
     * inserts game data into leaderboard
     * @param int $userId id of user
     * @param string $gameTime length of game time in seconds
     * @param int $score score of game
     * @param int $pcoCount number of consequetive PCOs
     */
    public function insertScore(int $userId, string $gameTime, int $score, int $pcoCount){
        try {
            $userData = array(
                'user_id' => $userId,
                'date_submitted' => date_create()->format('Y-m-d H:i:s'),
                'game_time' => $gameTime,
                'score' => $score,
                'pco_count' => $pcoCount
            );
            $this->db->insert('leaderboard', $userData);

        } catch(PDOException $e){
            log_message('error', $e->errorInfo);
        }
    }
}