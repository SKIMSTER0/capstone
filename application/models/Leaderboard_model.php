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
            $this->db->select('users.username, leaderboard.pco_count, leaderboard.score, leaderboard.game_time, leaderboard.date_submitted')
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

    /**
     * Retrieve user's current leaderboard ranking
     * @param int $userId
     * @return int leaderboard rank
     */
    public function getLeaderboardRank(int $userId){
        try {
            $bestScore = $this->getBestScore($userId);
            if ($bestScore == null) return null;

            $query = $this->db->query('
                SELECT ROW_NUMBER() OVER (ORDER BY score DESC) as rank
                FROM leaderboard
                where user_id=?
                GROUP BY user_id
                ORDER BY score DESC;
            ', $userId);

            return $query->row()->rank;
        } catch (PDOexception $e) {
            log_message('error', $e->errorInfo);
        }
    }

    /**
     * @param int $userId
     * @return array largest pco count user submitted in a game
     */
    public function getBestPCOCount(int $userId){
        try {
            $this->db->select_max('pco_count');
            $this->db->where('user_id', $userId);
            $query = $this->db->get('leaderboard');

            $result = $query->result_array();

            return $result[0]['pco_count'];
        } catch (PDOexception $e) {
            log_message('error', $e->errorInfo);
        }
    }

    /**
     * @param int $userId
     * @return array max score user submitted
     */
    public function getBestScore($userId){
        try {
            $this->db->select_max('score');
            $this->db->where('user_id', $userId);
            $query = $this->db->get('leaderboard');
            $result = $query->result_array();

            return $query->result_array()[0]['score'];
        } catch (PDOexception $e) {
            log_message('error', $e->errorInfo);
        }
    }
}